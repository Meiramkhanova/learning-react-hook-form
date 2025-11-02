import { useForm, type SubmitHandler } from "react-hook-form";

type FormFields = {
  email: string;
  password: string;
};

function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "test@gmail.com",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      throw new Error();
      console.log(data);
    } catch (err) {
      setError("root", {
        message: "Email is already taken",
      });
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <form
        className="tutorial flex flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("email", {
            required: "Email is required",
            //some pattern
            validate: (value) => {
              if (!value.includes("@")) {
                return "Email must include @";
              }

              return true; //in case when the input if valid you anyway have to return boolean
            },
          })}
          placeholder="Email"
          className="border py-4 rounded px-3 w-96 border-gray-400 outline-none text-gray-600 focus:border-lime-500"
        />
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}

        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
          })}
          placeholder="Password"
          className="border py-4 rounded px-3 w-96 border-gray-400 outline-none text-gray-600 focus:border-lime-500"
        />
        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="border py-4 rounded px-3 w-96 outline-none text-white bg-lime-300 hover:bg-lime-500 cursor-pointer transition-colors duration-300 ease-in-out border-lime-300 hover:border-lime-500">
          {isSubmitting ? "Loading" : "Submit"}
        </button>

        {errors.root && (
          <div className="text-red-500">{errors.root.message}</div>
        )}
      </form>
    </div>
  );
}

export default App;

/*
just info for myself improvement:
🧩 1. Что такое register

register — это функция, а не объект.
Ты её получаешь вот тут:
const { register } = useForm<FormFields>();

Функция useForm() возвращает разные вещи (например register, handleSubmit, reset и т.д.).
А register — одна из них.
🧠 2. Что делает register("email")

Когда ты вызываешь: register("email") ты вызвала функцию register и передала ей строку "email" — это имя поля, 
за которым React Hook Form будет следить.

Результат вызова register("email") — это объект.
Вот пример, что он возвращает внутри (упрощённо):
{
  name: "email",
  onChange: ƒ,
  onBlur: ƒ,
  ref: ƒ
}

🧩 3. Почему перед ним ставится ...

Троеточие (...) — это spread оператор, и он «раскрывает» объект.
Когда ты пишешь:
<input {...register("email")} />

React видит это так:

<input
  name="email"
  onChange={...}
  onBlur={...}
  ref={...}
/>


✅ Деструктуризация — это способ достать значения из объекта (или массива) в отдельные переменные.

Пример:
const { register } = useForm<FormFields>();
означает:
Возьми из объекта, который возвращает useForm(), свойство register,
и сохрани его в переменную register.

То же самое без деструктуризации:

const form = useForm<FormFields>();
const register = form.register;


<form onSubmit={handleSubmit(onSubmit)}>
вот что происходит:

handleSubmit — это функция из useForm().

Она принимает твою функцию (onSubmit) как аргумент.

Когда пользователь нажимает кнопку “Submit”,
handleSubmit собирает все данные из формы и передаёт их в твою функцию.

SubmitHandler<FormFields> нужен только для TypeScript,
чтобы подсказать тип данных, которые твоя функция получит при отправке формы.

🔍 Без него:
const onSubmit = (data) => {
  console.log(data);
};


TypeScript не знает, что лежит в data —
можно случайно написать data.username, даже если такого поля нет.

*/
