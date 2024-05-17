import { Box, Button, ButtonGroup } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import theme from '@/lib/default-theme';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';


export default function SortDescription(props) {
  return (
    <Box
      className={`flex flex-col content-bitween lide-text min-h-31 grow text-2xl ${props.className}`}
      // border={1}
      borderRadius={1}
      boxShadow={3}
    >
      <p className='grow mx-4 mt-2 md:mx-10 md:mt-10' style={{"whiteSpace": "pre-wrap", "overflowY": "scroll"}}>
        {props.children}
      </p>
      <div className="flex justify-center">
        <input id="slide-range" type="range" value="0" className="w-5/6 h-2 m-5 bg-gray-200 rounded-lg appearance-none cursor-pointer slide-range" disabled />
      </div>
      <div className="flex justify-center">
        <div className="h-14 mb-4">
          <Button className="prev w-24 h-full" variant='contained'
            onClick={props.pressPrevCallback} disabled={props.isPrevDisabled}>
            戻る
          </Button>
          <Button className="prev w-24 h-full" variant='contained'
            onClick={props.pressAutoCallback}>
            自動再生
          </Button>
          <Button className="next w-24 h-full" variant='contained'
            onClick={props.pressNextCallback} disabled={props.isNextDisabled}>
            次へ
          </Button>
        </div>
      </div>
    </Box>
  );
}

// export default function SortDescription(props) {
//   return (
//     <Box
//       className={`flex lide-text min-h-31 grow text-2xl ${props.className}`}
//       // border={1}
//       borderRadius={1}
//       boxShadow={3}
//     >
//       <Button className="prev w-24 h-full" onClick={props.pressPrevCallback}>
//         <ArrowCircleLeftIcon
//           className='h-24 w-full' fontSize="large"
//         />
//       </Button>
//       <p className='grow m-4'>
//         {props.children}
//       </p>
//       <Button className="next w-24 h-full" onClick={props.pressNextCallback}>
//         <ArrowCircleRightIcon
//           className='h-24 w-full' fontSize="large"
//         />
//       </Button>
//     </Box>
//   );
// }