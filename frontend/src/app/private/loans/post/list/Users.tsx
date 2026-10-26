import { UserInterface } from "@/interfaces/usersInterface"

interface ListUsersInterface {
  users: UserInterface[],
  userSelected: number | null,
  setUserSelected: (id:number)=> void
}

export default function ListUsers({ users, userSelected, setUserSelected }: ListUsersInterface) {
  return (
    <div className="users">
      { users.length > 0 ? (
        users.map((user)=> {
          return (
            <div 
              onClick={()=>setUserSelected(user.id)}
              key={user.id} 
              className="user"
              id={user.id===userSelected?"selected":""}
            >
              <h3>{user.email}</h3>
            </div>
          )
        })
      ) : (
        <span className="erro">Nenhum usuário cadastrado ainda</span>
      ) }
    </div>
  )
}