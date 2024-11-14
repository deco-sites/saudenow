interface Props {
  name: string;
  email: string;
  cellphone: string;
}

interface Response {
  created: boolean;
}

const action = async (
  props: Props,
): Promise<Response> => {
  const { name, email, cellphone } = props;

  const headers = {
    "accept": "application/json",
    "content-type": "application/json",
  };

  const response: Response = await fetch(
    "https://sheetdb.io/api/v1/gzjgk7jzh0iza",
    {
      method: "POST",
      headers,
      body: JSON.stringify([{
        "Nome": name,
        "Whatsapp": cellphone,
        "E-mail": email,
      }]),
    },
  ).then((res) => res.json());

  return response;
};

export default action;
