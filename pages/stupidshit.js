export default function Stupid (props) {
    return <input id='hi' type='color' style={{position: 'absolute', top: '50%', left: '50%'}} onChange={() => {console.log(document.getElementById('hi').value)}}/>
}