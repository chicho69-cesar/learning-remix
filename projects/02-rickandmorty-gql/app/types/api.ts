export interface APIResponse {
  characters: Characters
}

export interface Characters {
  info:    Info
  results: Result[]
}

export interface Info {
  count: number
  pages: number
  next:  number | null
  prev:  number | null
}

export interface Result {
  id:      string
  name:    string
  status:  Status
  species: string
  gender:  string
  origin:  Origin
  image:   string
}

export interface Origin {
  name: string
}

export enum Status {
  Alive = "Alive",
  Dead = "Dead",
  Unknown = "unknown",
}
