import faunadb, {query as q} from 'faunadb'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const client = new faunadb.Client({secret: process.env.REACT_APP_FAUNA_KEY})

export  const createUser = async (firstName, lastName, email, password) => {
  password = await bcrypt.hash(password, bcrypt.genSaltSync(10))
  try {
    let newUser = await client.query(
      q.Create(
        q.Collection('users'),
        {
          data: {
            firstName, 
            email, 
            lastName, 
            password
          }
        }
      )
    )
    if (newUser.name === 'BadRequest') return
    newUser.data.id = newUser.ref.value.id
    return newUser.data
  } catch (error) {
    return
  }
}

export const getUser = async (userId) => {
  const userData = await client.query(
    q.Get(
      q.Ref(q.Collection('users'), userId)
    )
  )
  if (userData.name === "NotFound") return
  if (userData.name === "BadRequest") return "Something went wrong"
  userData.data.id = userData.ref.value.id
  return userData.data
}

export const loginUser = async (email, password) => {
  let userData = await client.query(
    q.Get(
      q.Match(q.Index('user_by_email'), email)
    )
  )
  if (userData.name === "NotFound") return
  if (userData.name === "BadRequest") return "Something went wrong"
  userData.data.id = userData.ref.value.id
  if (bcrypt.compareSync(password, userData.data.password)) return userData.data
  else return
}

export const createPassword = async (accountName, accountUrl, email, encryptedPassword, userId) => {
  let user = await getUser(userId)
  const date = new Date()
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  let newPassword = await client.query(
    q.Create(
      q.Collection('passwords'),
      {
        data: {
          accountName,
          accountUrl,
          email,
          encryptedPassword,
          created__at: `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`,
          user: {
            email: user.email, 
            id: user.id
          }
        }
      }
    )
  )
  if (newPassword.name === 'BadRequest') return
  newPassword.data.id = newPassword.ref.value.id
  return newPassword.data
}

export const getPasswordsByUserID = async id => {
  let passwords = []
  try {
    let userPasswords = await client.query(
      q.Paginate(
        q.Match(q.Index('user_passwords'), id)
      )
    )
    if (userPasswords.name === "NotFound") return
    if (userPasswords.name === "BadRequest") return "Something went wrong"
    for (let passwordId of userPasswords.data) {
      let password = await getPassword(passwordId.value.id)
      passwords.push(password)
    }
    return passwords
  } catch (error) {
    
    return
  }
}

export const getPassword = async id => {
  let password = await client.query(
    q.Get(q.Ref(q.Collection('passwords'), id))
  )
  if (password.name === "NotFound") return
  if (password.name === "BadRequest") return "Something went wrong"
  password.data.id = password.ref.value.id
  return password.data
}

export const updatePassword = async (payload, id) => {
  let password = await client.query(
    q.Update(
      q.Ref(q.Collection('passwords'), id),
      {data: payload}
    )
  )
  if (password.name === "NotFound") return
  if (password.name === "BadRequest") return "Something went wrong"
  password.data.id = password.ref.value.id
  return password.data
}

export const deletePassword = async id => {
  let password = await client.query(
    q.Delete(
      q.Ref(q.Collection('passwords'), id)
    )
  )
  if (password.name === "NotFound") return
  if (password.name === "BadRequest") return "Something went wrong"
  password.data.id = password.ref.value.id
  return password.data
}