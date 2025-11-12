import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT_URL!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

export async function uploadToR2(file: File, userId: string): Promise<string> {
  const fileBuffer = await file.arrayBuffer()
  const fileName = `${userId}/${Date.now()}-${file.name}`

  await r2Client.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: fileName,
      Body: Buffer.from(fileBuffer),
      ContentType: file.type,
    })
  )

  return fileName
}