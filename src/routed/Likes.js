import * as React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';

import foto from '../assets/perfil_editada.jpeg'

export default function About() {

  const [likes, setLikes] = React.useState(
    () => parseInt(window.localStorage.getItem('likes')) || 0
  )

  React.useEffect(() => {
    window.localStorage.setItem('likes', likes)    
  }, [likes])

  return (
    <>
      <h1>Sobre o autor</h1>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="345"
          image={foto}
          alt="Minha foto"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            André Guerra Santos
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Estudante de Análise e Desenvolvimento de Sistemas, pela Faculdade de Tecnologia FATEC Franca. Atualmente tenho 19 anos de idade, e almejo encontrar uma oportunidade para ingresar no mundo "dev".
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            color="secondary"
            variant="contained"
            startIcon={<FavoriteIcon />}
            onClick={() => setLikes(likes + 1)}
          >
            Curtir ({likes})
          </Button>
        </CardActions>
      </Card>
    </>

  )
  }
