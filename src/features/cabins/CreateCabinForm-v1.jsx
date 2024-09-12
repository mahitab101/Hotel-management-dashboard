
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";



function CreateCabinForm() {
  const { register, handleSubmit, reset, formState: { errors }, getValues } = useForm();
  console.log("errors", errors);

  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: CreateCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      });
      reset();
    },
    onError: (error) => toast.error(error.message)
  })


  function onSubmit(data) {
    // console.log({...data,image:data.image.[0]});

    mutate({ ...data, image: data.image[0]});
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
        <FileInput id="image" accept="image/*" {...register("image", { required: "this field is required" })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button variation="primary" disabled={isPending}>{isPending ? "loading..." : "Add cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
