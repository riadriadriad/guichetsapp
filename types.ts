type Guichet={
    icon?:string
    name:string 
    role:Role
    state:State
    favori:boolean
}
type Role = 'Admin' | 'User' | 'Guest';
type State = 'Active' | 'Inactive' | 'Pending';