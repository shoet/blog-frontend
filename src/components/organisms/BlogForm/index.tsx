import { Button } from '@/components/atoms/Button'
import DropableTextArea from '@/components/atoms/DropableTextArea'
import Dropzone from '@/components/atoms/Dropzone'
import { Input } from '@/components/atoms/Input'
import { Text } from '@/components/atoms/Text'
import Box from '@/components/layout/Box'
import Flex from '@/components/layout/Flex'
import TagForm from '@/components/molecules/TagForm'
import { getSignedPutUrl } from '@/services/files/get-signed-url'
import { putSignedUrl } from '@/services/files/put-file'
import { ApiContext, Blog } from '@/types/api'
import { parseCookie } from '@/utils/cookie'
import { generateBase32EncodedUuid } from '@/utils/ids'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'

// TODO: フォームにタグを入力する際、Enterでタグの決定するが、「,」でもタグ決定とみなす。
// TODO: backend側でタグをカンマ区切りでハンドリングするため
export type BlogFormData = {
  id: number
  title: string
  description: string
  content: string
  authorId: number
  isPublic: boolean
  thumbnailImageFileName?: string
  tags: string[]
}

type BlogFormProps = {
  data?: Blog
  onSubmit?: (data: BlogFormData) => void
}

const PreviewImageTitle = styled(Box)`
  border-radius: 5px 5px 0px 0px; 
`

const PreviewImageWrapper = styled.div`
  width: 100%;
  height: 150px;
  > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export const BlogForm = (props: BlogFormProps) => {
  // TODO: authorId
  const { data, onSubmit } = props

  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<BlogFormData>({
    defaultValues: data,
  })

  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [previewImage, setPreviewImage] = useState<string>(
    data?.thumbnailImageFileName || '',
  )

  const handleOnSubmit = async (data: BlogFormData) => {
    data.authorId = 1 // TODO
    onSubmit && onSubmit(data)
  }

  const apiContext: ApiContext = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  }
  const token = parseCookie(document.cookie)['authToken']

  const onDropTextArea = async (files: File[]) => {
    if (files.length != 1) {
      control.setError('content', {
        message: '一度にアップロードできる画像は1つまでです。',
      })
      return
    }
    const fileName = `${generateBase32EncodedUuid()}.${
      files[0].type.split('/')[1]
    }`
    const resp = await getSignedPutUrl(
      apiContext,
      {
        fileName: fileName,
        fileType: 'content',
      },
      token,
    )
    const { signedUrl, putUrl } = resp
    await putSignedUrl({
      signedPutUrl: signedUrl,
      contentType: files[0].type,
      file: files[0],
    })
    const con = getValues().content
    setValue('content', con + `\n\n![](${putUrl} "")`)
  }

  return (
    <form>
      <Box>
        <Text as="label" variant="medium">
          Title
        </Text>
        <Box marginTop={1}>
          <Input
            {...register('title', { required: 'タイトルは必須です。' })}
            name="title"
            placeholder="Title"
            hasError={!!errors.title}
          />
          {errors.title && (
            <Text as="label" variant="small" color="danger">
              {errors.title.message}
            </Text>
          )}
        </Box>
      </Box>
      <Box marginTop={3}>
        <Text as="label" variant="medium">
          Description
        </Text>
        <Box marginTop={1}>
          <Input
            {...register('description', { required: '概要は必須です。' })}
            name="description"
            placeholder="Description"
            hasError={!!errors.description}
          />
          {errors.description && (
            <Text as="label" variant="small" color="danger">
              {errors.description.message}
            </Text>
          )}
        </Box>
      </Box>
      <Flex
        marginTop={3}
        flexDirection="row"
        alignItems="start"
        justifyContent="space-between"
      >
        <Box width="40%">
          <Text as="label" variant="medium">
            Thumbnail
          </Text>
          <Box marginTop={1}>
            <Controller
              control={control}
              name="thumbnailImageFileName"
              defaultValue=""
              render={({ field: { onChange } }) => (
                <>
                  <Dropzone
                    value={imageFiles}
                    onChange={async (files) => {
                      if (files.length > 1) {
                        control.setError('thumbnailImageFileName', {
                          message: 'サムネイルは1つまでです。',
                        })
                        return
                      }
                      const fileName = `${generateBase32EncodedUuid()}.${
                        files[0].type.split('/')[1]
                      }`
                      const resp = await getSignedPutUrl(
                        apiContext,
                        {
                          fileName: fileName,
                          fileType: 'thumbnail',
                        },
                        token,
                      )
                      const { signedUrl, putUrl } = resp
                      await putSignedUrl({
                        signedPutUrl: signedUrl,
                        contentType: files[0].type,
                        file: files[0],
                      })
                      setImageFiles(files)
                      setPreviewImage(putUrl)
                      onChange(putUrl)
                    }}
                  >
                    {previewImage && (
                      <Box>
                        {imageFiles.length > 0 && (
                          <PreviewImageTitle
                            backgroundColor="primary"
                            padding="3px"
                          >
                            <Text color="white">{imageFiles[0].name}</Text>
                          </PreviewImageTitle>
                        )}
                        <PreviewImageWrapper>
                          <img src={previewImage} />
                        </PreviewImageWrapper>
                      </Box>
                    )}
                  </Dropzone>
                  {errors.thumbnailImageFileName && (
                    <Text as="label" variant="small" color="danger">
                      {errors.thumbnailImageFileName.message}
                    </Text>
                  )}
                </>
              )}
            />
          </Box>
        </Box>
        <Box width="55%">
          <Text as="label" variant="medium">
            Tags
          </Text>
          <Box marginTop={1}>
            <Controller
              control={control}
              defaultValue={[]}
              name="tags"
              rules={{
                validate: (value) => {
                  return (
                    (0 <= value.length && value.length <= 5) ||
                    '選択できるタグは5つまでです。'
                  )
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TagForm
                  placeholder="Tags"
                  value={value}
                  onKeyDown={(tags: string[]) => onChange(tags)}
                />
              )}
            />
            {errors.tags && (
              <Text as="label" variant="small" color="danger">
                {errors.tags.message}
              </Text>
            )}
          </Box>
        </Box>
      </Flex>
      <Box marginTop={3}>
        <Text as="label" variant="medium">
          Content
        </Text>
        <Box marginTop={1}>
          <Controller
            control={control}
            name="content"
            rules={{ validate: (value) => !!value || '本文は必須です。' }}
            render={({ field: { onChange, value } }) => (
              <DropableTextArea
                minRows={10}
                value={value}
                onChange={onChange}
                onDrop={onDropTextArea}
              />
            )}
          />
          {errors.content && (
            <Text as="label" variant="small" color="danger">
              {errors.content.message}
            </Text>
          )}
        </Box>
      </Box>
      <Flex justifyContent="flex-end" alignItems="end" marginTop={2}>
        <Box paddingRight={2}>
          <input type="checkbox" {...register('isPublic')} />
          <Text as="label" variant="small" color="gray">
            公開
          </Text>
        </Box>
        <Button
          variant="primary"
          type="button"
          onClick={handleSubmit(handleOnSubmit)}
        >
          Post
        </Button>
      </Flex>
    </form>
  )
}
