"use client";

import { axiosInstance } from "@/lib/axios";
import { useAppDispatch } from "@/redux/hooks";
import { loginAction } from "@/redux/slices/userSlice";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface LoginPayload {
  email: string;
  password: string;
}
const useLogin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await axiosInstance.post("/auth/login", payload);
      return data;
    },
    onSuccess: (data) => {
      toast.success("Login succsess");
      dispatch(loginAction(data)); //masukin data ke global state
      localStorage.setItem("blog-storage", JSON.stringify(data)); // masukin data ke localStorage
      router.replace("/");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};
export default useLogin;
