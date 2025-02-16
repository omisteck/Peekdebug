import { z } from 'zod';

// Origin Schema
const OriginSchema = z.object({
  file: z.string(),
  line_number: z.number().positive(),
  hostname: z.string()
});


// Individual Payload Schema
const PayloadSchema = z.object({
  type: z.string(),
  content: z.any(),
  origin: OriginSchema,
  status: z.string().optional().nullable()
});

// Global Meta Schema
const MetaSchema = z.object({
  php_version: z.string().regex(/^\d+\.\d+\.\d+$/),
  php_version_id: z.number().int(),
  project_name: z.string(),
  laravel_version: z.string(),
  peek_package_version: z.string()
});

// Root Schema
const PeekPayloadSchema = z.object({
  uuid: z.string().uuid(),
  payloads: z.array(PayloadSchema),
  meta: MetaSchema
}).strict();

// Type definitions
type PeekPayload = z.infer<typeof PeekPayloadSchema>;
type Payload = z.infer<typeof PayloadSchema>;
type Meta = z.infer<typeof MetaSchema>;


export {
  PeekPayloadSchema,
  type PeekPayload,
  type Payload,
  type Meta
};
