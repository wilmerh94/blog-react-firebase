import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// @mui

import { Collapse, Container, InputBase, Stack, useTheme } from '@mui/material'
// @mui/icons
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'
import { searchInputUser } from 'src/redux/userDuck'

export const SearchControl = () => {
  const [checked, setChecked] = useState(false)

  const { transitions } = useTheme()
  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/blogs')
    dispatch(searchInputUser(inputValue))
  }
  const handleCollapse = () => {
    setChecked(true)
    setTimeout(() => {
      setChecked(false)
    }, 6000)
  }
  return (
    <Collapse orientation='horizontal' in={checked} collapsedSize={55} sx={{ borderRadius: '15px' }}>
      <Container
        sx={{
          width: '250px',
          display: 'flex',
          padding: '5px',
          paddingLeft: { sm: '16px' },
          // paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
          background: ' rgba(156, 160, 163, 0.507)',
          borderRadius: '10px',
          position: 'relative',
          justifyContent: 'space-between',
          '& .MuiContainer-root': {
            transition: transitions.create('width')
          }
        }}
        // onMouseEnter={() => setIsHovered(true)}

        onClick={handleCollapse}>
        <Stack
          direction='row'
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }}>
          <InputBase
            sx={{
              width: '100%',
              color: 'inherit'
            }}
            placeholder='Search for a blogs'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            inputProps={{ 'aria-label': 'Search' }}
            startAdornment={<SearchIcon sx={{ mr: 2, cursor: 'pointer' }} onClick={handleSearch} />}
          />
        </Stack>
      </Container>
    </Collapse>
  )
}
