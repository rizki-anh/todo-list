import Batik from "../../assets/batik.png";
import RegisterImage from "../../assets/R.png";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../elements/button";
import Icon from "../elements/icon";
import Filter from "../filter/filter";
import RateLimiiter from "../filter/ratelimiit";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "../../../styles/index.css";
import { useRef, useState } from "react";

const schema = z.object({
  firstname: z
    .string()
    .min(2, "First name harus memiliki minimal 2 karakter")
    .regex(
      /^[A-Za-z\s]+$/,
      "First name hanya boleh mengandung huruf dan spasi"
    ),
  username: z
    .string()
    .min(6, "Username harus minimal 6 karakter")
    .max(20, "Username maksimal 20 karakter")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username hanya boleh mengandung huruf, angka, dan underscore"
    ),
  email: z.string().email("email tidak valid"),
  lastname: z
    .string()
    .min(2, "lastname harus memiliki minimum 2 karakter")
    .max(20, "lastname maksimal 20 karakter")
    .optional()
    .or(z.literal("")),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .regex(/[A-Z]/, "Password harus mengandung setidaknya 1 huruf besar")
    .regex(/[a-z]/, "Password harus mengandung setidaknya 1 huruf kecil")
    .regex(/[0-9]/, "Password harus mengandung setidaknya 1 angka")
    .regex(/[^A-Za-z0-9]/, "Password harus mengandung setidaknya 1 simbol"),
  confirmpassword: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .regex(/[A-Z]/, "Password harus mengandung setidaknya 1 huruf besar")
    .regex(/[a-z]/, "Password harus mengandung setidaknya 1 huruf kecil")
    .regex(/[0-9]/, "Password harus mengandung setidaknya 1 angka")
    .regex(/[^A-Za-z0-9]/, "Password harus mengandung setidaknya 1 simbol"),
});

type Registervalidasi = z.infer<typeof schema>;

interface InputField {
  name: string;
  type: "text" | "email" | "password"; // Hanya menerima tipe tertentu
  icon: string;
  dataregister: keyof Registervalidasi;
}

const Register = () => {
  const Formref = useRef<HTMLFormElement>(null);
  const Checkbox = useRef<HTMLInputElement>(null);
  const [Passnomatch, setPassnomatch] = useState("");
  const Navigate = useNavigate();
  const button = RateLimiiter(5, 5000);
  const { register, handleSubmit } = useForm<Registervalidasi>({
    resolver: zodResolver(schema),
  });
  const mapping: InputField[] = [
    {
      name: "Enter First Name",
      type: "text",
      icon: "line-md:account",
      dataregister: "firstname",
    },
    { 
      name: "Enter Last Name",
      type: "text",
      icon: "wpf:name",
      dataregister: "lastname",
    },
    {
      name: "Enter Username",
      type: "text",
      icon: "uis:user-md",
      dataregister: "username",
    },
    {
      name: "Enter Email",
      type: "email",
      icon: "mdi:email",
      dataregister: "email",
    },
    {
      name: "Enter Passworld",
      type: "password",
      icon: "mdi:password",
      dataregister: "password",
    },
    {
      name: "Enter You Age",
      type: "password",
      icon: "arcticons:broken-age",
      dataregister: "confirmpassword",
    },
  ];

  const submit = async (data: Registervalidasi) => {
    if (Checkbox.current?.checked) {
      if (data.password === data.confirmpassword) {
        if (button()) {
          try {
            const respon = await fetch("https://dummyjson.com/users/add", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                firstName: Filter(data.firstname),
                lastName: Filter(data.lastname ?? ""),
                username: Filter(data.username),
                email: Filter(data.email),
                password: Filter(data.password),
                confirmpassword: Filter(data.confirmpassword),
                /* other user data */
              }),
            });
            const responData = await respon.json();
            console.log(responData);
            if (responData.message) {
              throw new Error(responData.message);
            }
            Navigate("/");
            Formref.current?.reset();
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        setPassnomatch("Password Tidak Sama");
        Formref.current?.reset();
      }
    }
  };

  return (
    <>
      <div className="container">
        <div
          className="w-screen h-screen bg bg-[#FF6767] flex justify-center items-center"
          style={{ backgroundImage: `url(${Batik})` }}
        >
          <form
            className="w-[1236px] h-[767px] max-sm:h-[70vh] max-sm:w-[82vw] bg-white flex 2xl:flex-row-reverse"
            onSubmit={handleSubmit(submit)}
            ref={Formref}
          >
            <div className="flex-1 flex 2xl:items-start justify-center max-sm:h-[70vh] flex-col ">
              <div className="flex flex-col 2xl:gap-6 gap-4 max-sm:items-center ">
                <div className="relative top-2">
                  <h1 className="max-sm:text-3xl font-bold  text-4xl  2xl:mb-2 ">
                    Sign Up
                  </h1>
                </div>
                {mapping.map((item, index) => {
                  return (
                    <div key={index} className="flex items-center">
                      <Icon
                        icon={item.icon}
                        className="2xl:text-4xl absolute pl-2 text-2xl"
                      ></Icon>
                      <input
                        key={index}
                        {...register(item.dataregister)}
                        type={item.type}
                        placeholder={item.name}
                        className="2xl:h-[60px] 2xl:w-[559px] border border-black rounded-lg z-10 2xl:text-xl 2xl:pl-12 max-sm:w-[281px] max-sm:h-[30px] pl-8"
                      ></input>
                    </div>
                  );
                })}
                <h1 className=" max-sm:w-[281px] max-sm:mt-[-12px] max-sm:mb-[-6px] 2xl:text-2xl text-[#FF9090]">
                  {Passnomatch}
                </h1>
                <div className="flex gap-4  max-sm:w-[281px] mb-[-5px] mt-[-2px]">
                  <input type="checkbox" className="h-5 w-5" ref={Checkbox} />
                  <h1 className="2xl:text-xl mt-[-4px]">
                    I agree to all terms
                  </h1>
                </div>
                <div className="max-sm:w-[281px]">
                  <Button
                    type="submit"
                    className="bg-[#FF9090] text-white 2xl:w-[129px] 2xl:h-[60px] self-start h-10 w-18 mb-[-10px]"
                  >
                    Register
                  </Button>
                </div>
                <div className="max-sm:w-[281px] 2xl:mb-[6px] max-sm:relative max-sm:top-[-6px]">
                  <h1 className="2xl:text-xl">
                    Already have an account?{" "}
                    <Link to="/" className="text-blue-400">
                      Sign In
                    </Link>
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex-1 items-end justify-start 2xl:flex hidden  ">
              <img
                src={RegisterImage}
                alt=""
                className="max-sm:hidden max-sm:absolute w-[434px] h-[653.51px]"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
