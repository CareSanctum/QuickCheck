import * as React from "react"
import Svg, { Path, Circle, G, Use, SvgProps} from "react-native-svg"

function IN_square(props: any) {
  return (
    <Svg
      width={900}
      height={600}
      fill="#07038D"
      viewBox="-45 -30 90 60"
      {...props}
    >
      <Path fill="#FFF" d="M-45-30h90v60h-90z" />
      <Path fill="#FF6820" d="M-45-30h90v20h-90z" />
      <Path fill="#046A38" d="M-45 10h90v20h-90z" />
      <Circle r={9.25} />
      <Circle r={8} fill="#FFF" />
      <Circle r={1.6} />
      <G id="d">
        <G id="c">
          <G id="b">
            <G id="a">
              <Path d="M0-8l.3 4.814L0-.802l-.3-2.384z" />
              <Circle cy={-8} r={0.35} transform="rotate(7.5)" />
            </G>
            <Use href="#a" transform="scale(-1)" />
          </G>
          <Use href="#b" transform="rotate(15)" />
        </G>
        <Use href="#c" transform="rotate(30)" />
      </G>
      <Use href="#d" transform="rotate(60)" />
      <Use href="#d" transform="rotate(120)" />
    </Svg>
  )
}

export default IN_square


// import * as React from "react"
// import Svg, { Path, Circle, G, Use, SvgProps} from "react-native-svg"

// function SvgComponent(props: SvgProps) {
//   return (
//     <Svg
//       width={900}
//       height={600}
//       fill="#07038D"
//       viewBox="-45 -30 90 60"
//       {...props}
//     >
//       <Path fill="#FFF" d="M-45-30h90v60h-90z" />
//       <Path fill="#FF6820" d="M-45-30h90v20h-90z" />
//       <Path fill="#046A38" d="M-45 10h90v20h-90z" />
//       <Circle r={9.25} />
//       <Circle r={8} fill="#FFF" />
//       <Circle r={1.6} />
//       <G id="d">
//         <G id="c">
//           <G id="b">
//             <G id="a">
//               <Path d="M0-8l.3 4.814L0-.802l-.3-2.384z" />
//               <Circle cy={-8} r={0.35} transform="rotate(7.5)" />
//             </G>
//             <Use href="#a" transform="scale(-1)" />
//           </G>
//           <Use href="#b" transform="rotate(15)" />
//         </G>
//         <Use href="#c" transform="rotate(30)" />
//       </G>
//       <Use href="#d" transform="rotate(60)" />
//       <Use href="#d" transform="rotate(120)" />
//     </Svg>
//   )
// }

// export default SvgComponent
