import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/UsersReducer'
import { Link } from 'react-router-dom'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
  Container,
} from '@mui/material'

const Users = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const usersList = useSelector((state) => state.users)

  if (!usersList) return null

  return (
    <div>
      <Container>
        <h2>users</h2>
        <Paper sx={{ marginBottom: 2, padding: 2 }}>
          <TableContainer>
            <Table>
              <TableHead x>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>blogs created</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersList.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Link to={`/users/${user.id}`}>{user.name}</Link>
                    </TableCell>
                    <TableCell>
                      <Chip label={user.blogsCount} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </div>
  )
}

export default Users
