import { div } from "three/examples/jsm/nodes/Nodes.js";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export default function OnboardingForm({
  action,
  buttonText,
  btnType,
  formControls,
  isBtnDisabled,
  formData,
  setFormData,
  onSubmit,
}) {
  const renderInputByType = (getCurrentControl) => {
    let content = null;
    switch (getCurrentControl.componentType) {
      case "input":
        content = (
          <div className="relative flex items-center mt-6">
            <Input
              type="text"
              disabled={getCurrentControl.disabled}
              placeholder={getCurrentControl.placeholder}
              name={getCurrentControl.name}
              id={getCurrentControl.name}
              value={formData[getCurrentControl.name]}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  [event.target.name]: event.target.value,
                });
              }}
              className="text-base w-full rounded-lg px-4 h-12 bg-slate-800 text-gray-400"
            />
          </div>
        );
        break;
      case "textarea":
        content = (
          <div className="relative flex items-center mt-6">
            <Textarea
              disabled={getCurrentControl.disabled}
              placeholder={getCurrentControl.placeholder}
              name={getCurrentControl.name}
              id={getCurrentControl.name}
              value={formData[getCurrentControl.name]}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  [event.target.name]: event.target.value,
                });
              }}
              className="text-base w-full rounded-lg px-4  bg-slate-800 text-gray-400 h-[150px] resize-none"
            />
          </div>
        );
        break;

      default:
        content = (
          <div className="relative flex items-center mt-8">
            <Input
              type="text"
              disabled={getCurrentControl.disabled}
              placeholder={getCurrentControl.placeholder}
              name={getCurrentControl.name}
              id={getCurrentControl.name}
              value={formData[getCurrentControl.name]}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  [event.target.name]: event.target.value,
                });
              }}
              className="text-base w-full rounded-lg px-4 h-12 bg-slate-800 text-gray-400"
            />
          </div>
        );
        break;
    }
    return content;
  };
  return (
    <form action={action} onSubmit={onSubmit}>
      {formControls.map((control) => renderInputByType(control))}
      <div>
        <Button
          className={`disabled:opacity-60 flex h-12 text-base items-center justify-center px-4  mt-6 mb-6 bg-slate-800 hover:bg-slate-800 text-white-100 hover:brightness-125 transition-all`}
          type={btnType || "Submit"}
          disabled={isBtnDisabled}
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
}
