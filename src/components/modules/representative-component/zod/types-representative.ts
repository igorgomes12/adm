export interface representative {
  id: number
  name: string
  cellphone: string
  phone: string
  email: string
  supervisor: string
  status: string
  type: string
  region: string
  commission: Commission
  address: Address
}

export interface Address {
  municipality_name: string
  neighborhood: string
  number: string
  street: string
  state: string
  postal_code: string
}

export interface Commission {
  implantation: number
  mensality: number
}
