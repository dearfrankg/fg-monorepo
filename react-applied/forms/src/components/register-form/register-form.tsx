import { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, VStack, Input, Button, useToast } from "@chakra-ui/react";
import AlertPop from "./alert-pop";

const redOutline = { border: "1px solid red" };
const noOutline = {};

const RegisterForm = () => {
  const [state, setState] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const toast = useToast();

  const styles = {
    firstname: errors.firstname ? redOutline : noOutline,
    lastname: errors.lastname ? redOutline : noOutline,
    password: errors.password ? redOutline : noOutline,
  };

  const onSubmit = (data: any) => {
    toast({
      title: "Submitted!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setState(data);
    reset({ firstname: "", lastname: "", password: "" });
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack>
          <Input
            type="text"
            placeholder="First name"
            {...register("firstname", {
              required: "Please enter first name",
              minLength: 3,
              maxLength: 80,
            })}
            style={styles.firstname}
          />

          <Input
            type="text"
            placeholder="Last name"
            {...register("lastname", {
              required: "Please enter Last name",
              minLength: 3,
              maxLength: 100,
            })}
            style={styles.lastname}
          />

          <Input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Please enter Password",
              minLength: { value: 8, message: "Password too short" },
            })}
            style={styles.password}
          />

          {errors.firstname && <AlertPop title={errors.firstname.message} />}
          {errors.lastname && <AlertPop title={errors.lastname.message} />}
          {errors.password && <AlertPop title={errors.password.message} />}

          <Button
            borderRadius="md"
            bg="cyan.600"
            _hover={{ bg: "cyan.200" }}
            variant="ghost"
            type="submit"
          >
            Submit
          </Button>
          <div>{!!state && <pre>{JSON.stringify(state, null, 2)}</pre>}</div>
        </VStack>
      </form>
    </Box>
  );
};
export default RegisterForm;
