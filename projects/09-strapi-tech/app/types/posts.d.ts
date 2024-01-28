export interface PostResponse {
  data: Data[]
  meta: Meta
}

export interface Data {
  id:         number
  attributes: Attributes
}

export interface Attributes {
  title:       string
  content:     string
  slug:        string
  createdAt:   string
  updatedAt:   string
  publishedAt: string
  miniature:   Miniature
}

export interface Miniature {
  data: DataImage
}

export interface DataImage {
  id:         number
  attributes: DataImageAttributes
}

export interface DataImageAttributes {
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
  pagination: Pagination
}

export interface Pagination {
  page:      number
  pageSize:  number
  pageCount: number
  total:     number
}
