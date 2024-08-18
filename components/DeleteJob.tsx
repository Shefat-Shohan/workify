import MagicButton from "./ui/MagicButton";

export default function DeleteJob({ handleDelete }:{handleDelete: ()=> void,  }) {
  return (
    <div> 
      <MagicButton title="Delete" icon="" position="" handleClick={handleDelete} /> 
    </div>
  );
}
