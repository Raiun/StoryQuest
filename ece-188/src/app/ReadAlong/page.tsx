import ReadingScreen from "@/Components/ReadingScreen";


export default function ReadAlong(props: {storyName : string;}) {
  return (
    <ReadingScreen storyName={props.storyName}></ReadingScreen>
  );
}