/*1. Crie um novo arquivo de componente e coloque-o na pasta src/routed.*/
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Foto from '../assets/perfil_editada.jpeg'
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Likes() {

/*2. Nesse componente, declare uma variável de estado e, usando um "lazy initializer", inicialize-a com o valor lido de uma entrada no "localStorage" chamada "likes".*/
    const [state, setState] = React.useState(() => ({
        likes: 'likes',
    }))

    const {likes} = state

/*3. Após a variável de estado "likes" ter sido atualizada e gerar uma atualização do componente, como EFEITO COLATERAL, armazene o conteúdo da variável de estado no "localStorage".
*/
function getData(otherState = state) {
    
     localStorage.getItem('likes')
     //Callback para o caso de sucesso
        setState({...otherState})
        localStorage.setItem('likes', likes)

}

// Vetor de dependencias vazio -> useEffect()
//será executado apenas uma vez, durante o carregamento (montagem) do componenete!  
React.useEffect(() => {
    getData()
}, [])

function sendLike(){
    //incrementa variavel de estado
    localStorage.setItem('likes', likes + 1)
    likes = localStorage.getItem('likes')
  
}

/*4. Dentro do componente, insira um título de nível 1 com o texto "Sobre o autor" ou "Sobre a autora", conforme o caso.
*/
    return (
    <>
        <h1>Sobre o autor</h1>

        <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="500"
        image={Foto}
        alt="perfil"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          André Guerra Santos
        </Typography>
        <Typography variant="body2" color="text.secondary">
          André, tenho 19 anos, atualmente cursando Análise e Desenvolvimento de Sistemas e a procura de um estágio na área. Esse projeto foi desenvolvido na disciplina de Programação WEB, e eu não faço mais ideia do que escrever ^^
        </Typography>
      </CardContent>
      <CardActions>
        <Button
        size="small"
        variant="contained"
        color="secondary"
        type="submit"
        startIcon={<FavoriteIcon/>}
        onClick={sendLike}>  
        Curtir ({likes})
        </Button>
      </CardActions>
    </Card>
    </>
)


      
}

