import MagicButton from "./ui/MagicButton";

export default function ApplyJob({ handleApply, disabled }:{handleApply: ()=> void,  disabled:boolean}) {
  return (
    <div> 
      <MagicButton title={disabled ? "Applied": "Apply Now"} icon="" position="" handleClick={handleApply} disabled={disabled}/> 
    </div>
  );
}
