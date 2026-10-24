import { UserInterface } from "@/interfaces/usersInterface"

interface ListUsersInterface {
  users: UserInterface[]
}

export default function ListUsers({ users }: ListUsersInterface) {
  return (
    <div className="users">
      { users.length > 0 ? (
        users.map((user)=> {
          return (
            <div key={user.id} className="user">
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