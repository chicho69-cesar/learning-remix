export interface Post {
  data: PostData
  meta: Meta
}

export interface PostData {
  id:         number
  attributes: PurpleAttributes
}

export interface PurpleAttributes {
  title:       string
  content:     string
  slug:        string
  createdAt:   string
  updatedAt:   string
  publishedAt: string
  miniature:   Miniature
}

export interface Miniature {
  data: MiniatureData
}

export interface MiniatureData {
  id:         number
  attributes: FluffyAttributes
}

export interface FluffyAttributes {
  name:              string
  alternativeText:   null
  caption:           null
  width:             number
  height:            number
  formats:           null
  hash:              string
  ext:               string
  mime:              string
  size:              number
  url:               string
  previewUrl:        null
  provider:          string
  provider_metadata: null
  createdAt:         string
  updatedAt:         string
}

export interface Meta {
}
