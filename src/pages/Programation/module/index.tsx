export interface Module {
  id: number
  system: string
  module: string
  status: boolean
}

export interface GroupedModules {
  [system: string]: Module[]
}
