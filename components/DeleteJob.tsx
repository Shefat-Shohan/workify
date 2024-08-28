import useFetch from "./service/useFetch";
import MagicButton from "./ui/MagicButton";
import { useUser } from "@clerk/nextjs";

export default function DeleteJob({ handleDelete }:{handleDelete: ()=> void,  }) {
  const {user} = useUser();
return (
    <div> 
      <MagicButton title="Delete" icon="" position="" handleClick={handleDelete} />  
    </div>
  );
}
