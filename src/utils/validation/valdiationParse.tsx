import useValidationStore from "./validationStore";

const ValidationParse = ({
  inputName,
  className,
}: {
  inputName: string;
  className?: string;
}) => {
  //   const { validation } = useSelector((state) => state.validate);
  const mainStore = useValidationStore();
  const validation = mainStore.validation;

  if (inputName in mainStore.validation) {
    return (
      <>
        <div className={`${className} text-red-500 mt-1 text-sm`}>
          {validation &&
            inputName in validation &&
            validation[inputName].map((element, key) => (
              <div key={key}>
                {element}
                <br />
              </div>
            ))}
        </div>
      </>
    );
  }
};

export default ValidationParse;
