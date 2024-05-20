import { Box, Card, CardContent, CardHeader, Button, Typography } from '@mui/material';
import Link from 'next/link';

const SectionCard = (props) => {

  let buttonLink = null;

  if(props.link) {
    buttonLink = (<Box sx={{ display: 'flex', justifyContent: 'flex-end', pb: 4 }}>
      <Link href={props.link}>
        <Button color="primary">{props.title}のアニメーションを見る ＞ </Button>
      </Link>
    </Box>);
  }

  let img1 = null;
  if(props.img1Link) {
    img1 = (<Box sx={{my: 4, mx: 2}}>
      <img
        className="object-cover md:h-64 shadow-lg"
        src={props.img1Link}
      />
    </Box>);
  }

  let img2 = null;
  if(props.img2Link) {
    img2 = (<Box sx={{my: 4, mx: 2}}>
      <img
        className="object-cover md:h-64 shadow-lg"
        src={props.img2Link}
      />
    </Box>);
  }

  return(
    <Card className="section-card my-4">
      <div
        className="flex flex-col md:flex-row md:px-4 md:pt-2"
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: "left", flexGrow: '1' }}
          className=""
        >
          <CardContent sx={{ flex: '1 0 auto' }}
          >
            <Typography component="div" variant="h5" pb={4}>
              {props.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" whiteSpace="pre-wrap">
              {props.description}
            </Typography>
          </CardContent>
          {buttonLink}
        </Box>
        {img1}
        {img2}
      </div>
    </Card>
  )
}

export default SectionCard;