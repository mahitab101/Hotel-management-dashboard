
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";



function CreateCabinForm({ cabinToEdit={},onCloseModal }) {
  
  const { id: editId, ...editValues } = cabinToEdit;

  const {isSaving,CreateNewCabin} = useCreateCabin();
 const {isEditing,EditCabin} = useEditCabin();

  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, formState: { errors }, getValues } = useForm({
    defaultValues: isEditSession ? editValues : {}
  });
 

  
  const isWorking = isSaving || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    console.log("imageName",image);
    
    if (isEditSession) EditCabin({newCabinData:{...data,image},id:editId},{
      onSuccess:(data)=>{
        console.log(data);
        reset();
        onCloseModal?.()
      },
     });
   else CreateNewCabin({ ...data, image: image },{
    onSuccess:(data)=>{
      console.log(data);
      reset();
      onCloseModal?.();
    },
   });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? "modal" : "regular"} >
      <FormRow label="name" error={errors?.name?.message}>
        <Input type="text" id="name" {...register("name", { required: "this field is required" })} />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity"{...register("maxCapacity", { required: "this field is required" })} />
      </FormRow>

      <FormRow label="regular Price" error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" {...register("regularPrice", { required: "this field is required" })} />
      </FormRow>

      <FormRow label="discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0}
          {...register('discount', {
            required: "Can't be empty, make it at least 0",
            validate: (value) =>
              getValues().regularPrice >= value ||
              'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow label="description" error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" {...register("description", { required: "this field is required" })} />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" {...register("image", { required: isEditSession ? false : "this field is required" })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={()=>onCloseModal?.()}>
          Cancel
        </Button>
        {/* <Button variation="primary" disabled={isWorking}>{isPending ? "loading..." : isEditSession ? "Edit" : "Add"}</Button> */}
        <Button variation="primary" disabled={isWorking}>
          { isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
