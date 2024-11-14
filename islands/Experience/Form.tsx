import { JSX } from "preact";
import { FormProps } from "deco-sites/saudenow/sections/Experience/Form.tsx";
import { Input } from "deco-sites/saudenow/components/ui/Input.tsx";
import { useSignal } from "@preact/signals";
import { invoke } from "deco-sites/saudenow/runtime.ts";

export default function Form({ title, button }: FormProps) {
  const { label, backgroundColor, textColor } = button;

  const loading = useSignal(false);
  const isSent = useSignal(false);

  const formValues = useSignal({
    name: "",
    email: "",
    cellphone: "",
  });

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      await invoke["deco-sites/saudenow"].actions.experience.form.send({
        name: formValues.value.name,
        email: formValues.value.email,
        cellphone: formValues.value.cellphone,
      });
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
    } finally {
      isSent.value = true;
      loading.value = false;
      formValues.value = { name: "", email: "", cellphone: "" };
    }
  };

  return (
    <form
      class="flex flex-col items-center justify-center gap-4 border-experience-linear-gradient p-6 w-full"
      onSubmit={handleSubmit}
    >
      <div dangerouslySetInnerHTML={{ __html: title }} />

      <div class="flex flex-col gap-4 items-center justify-center w-full">
        <Input
          name="name"
          type="text"
          placeholder="Nome:"
          required
          value={formValues.value.name}
          onInput={(e) =>
            formValues.value.name = (e.target as HTMLInputElement).value}
        />
        <Input
          name="email"
          type="email"
          placeholder="E-mail:"
          required
          value={formValues.value.email}
          onInput={(e) =>
            formValues.value.email = (e.target as HTMLInputElement).value}
        />
        <Input
          name="cellphone"
          type="text"
          placeholder="Telefone: (xx) xxxxx-xxxx"
          required
          value={formValues.value.cellphone}
          onInput={(e) =>
            formValues.value.cellphone = (e.target as HTMLInputElement).value}
        />
      </div>

      {!isSent.value
        ? (
          <button
            type="submit"
            style={{ color: textColor, backgroundColor }}
            aria-label="Enviar formulário"
            disabled={loading.value}
            class="flex items-center justify-center font-bold text-black rounded-md px-8 py-1.5 disabled:cursor-not-allowed"
          >
            {loading.value
              ? <span class="loading loading-spinner" />
              : <span>{label}</span>}
          </button>
        )
        : (
          <span class="text-white font-bold text-lg">
            Agradecemos a sua inscrição!
          </span>
        )}
    </form>
  );
}
