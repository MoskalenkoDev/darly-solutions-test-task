import {
  forwardRef,
  ReactElement,
  Ref,
  Dispatch,
  SetStateAction,
  useRef,
  memo,
} from "react";
import {
  Slide,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
  TextField,
  Divider,
  Grid,
  MenuItem,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { TransitionProps } from "@mui/material/transitions";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { eyeColor, eyeColorType, sex, sexType } from "../UsersList";
import { IUser } from "../UsersList";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  addUser: (userInfo: IUser) => Promise<void>;
}

interface IFormInput {
  firstName: string;
  surname: string;
  lastName: string;
  birthday: Date | null;
  weight: string;
  height: string;
  sex: string;
  eyeColor: string;
}

function AddRecordDialog({ isOpen, setOpen, addUser }: IProps) {
  const {
    handleSubmit,
    control,
    formState: { isValid },
    reset,
  } = useForm<IFormInput>({ mode: "all" });

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    handleClose();
    reset();
  };

  const onSelectClose = () => {
    setTimeout(() => {
      let elem = document?.activeElement as HTMLDivElement;
      elem.blur();
    }, 0);
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    let transformedData: IUser;
    transformedData = {
      ...data,
      id: Date.now() + "",
      birthday: moment(data.birthday).format("DD/MM/YYYY"),
      weight: Math.floor(+data.weight * 10) / 10,
      height: Math.floor(+data.height * 10) / 10,
      sex: data.sex as sexType,
      eyeColor: data.eyeColor as eyeColorType,
    };
    addUser(transformedData);
    handleCancel();
  };

  const submitFormRef = useRef<HTMLInputElement>(null);

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"???????????? ?????????? ??????????"}</DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-slide-description"
          sx={{ marginBottom: 2 }}
        >
          ???? ???????????? ???????????????? ?????????? ?????????? ?? ?????????? ??????????
        </DialogContentText>
        <Divider />
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="myform"
          style={{ paddingTop: 12 }}
        >
          <Grid container rowSpacing={1} columnSpacing={3}>
            <Grid item xs={4}>
              <Controller
                name="firstName"
                control={control}
                rules={{
                  required: "???????? ???? ??????????????????!",
                }}
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    label="????'??"
                    variant="standard"
                    {...field}
                    required
                    error={!!error}
                    helperText={error?.message || " "}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="surname"
                control={control}
                rules={{
                  required: "???????? ???? ??????????????????!",
                }}
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    label="????????????????"
                    variant="standard"
                    {...field}
                    error={!!error}
                    required
                    helperText={error?.message || " "}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="lastName"
                control={control}
                rules={{
                  required: "???????? ???? ??????????????????!",
                }}
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    label="???? ????????????????"
                    variant="standard"
                    {...field}
                    error={!!error}
                    required
                    helperText={error?.message || " "}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="birthday"
                control={control}
                rules={{
                  required: "???????? ???? ??????????????????!",
                  validate: {
                    dateFormat: (value) =>
                      moment(value).isValid() || "???????????????????????? ????????????!",
                    isCorrectData: (value) =>
                      moment(value).isBefore(moment.now()) ||
                      "???? ???? ?? ??????????????????????!",
                  },
                }}
                defaultValue={null}
                render={({
                  field: { ref, onBlur, name, ...field },
                  fieldState: { error },
                }) => (
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      label="???????? ????????????????????"
                      {...field}
                      disableFuture
                      inputRef={ref}
                      openTo="year"
                      inputFormat="DD/MM/YYYY"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          onBlur={onBlur}
                          name={name}
                          variant="standard"
                          required
                          error={!!error}
                          helperText={error?.message || " "}
                        />
                      )}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="weight"
                control={control}
                rules={{
                  required: "???????? ???? ??????????????????!",
                  min: { value: 0.01, message: "???????????? ????????!" },
                }}
                defaultValue=""
                render={({
                  field: { onChange, ...field },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="????????"
                    variant="standard"
                    onChange={({ target: { value } }) => {
                      if (+value >= 0)
                        onChange(value.replaceAll(/[+|\-| ]/gm, ""));
                    }}
                    {...field}
                    error={!!error}
                    required
                    helperText={error?.message || " "}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end" disablePointerEvents>
                          ????
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="height"
                control={control}
                rules={{
                  required: "???????? ???? ??????????????????!",
                  min: { value: 1, message: "???????????? ????????????!" },
                }}
                defaultValue=""
                render={({
                  field: { onChange, ...field },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="??????????"
                    variant="standard"
                    onChange={({ target: { value } }) => {
                      if (+value >= 0)
                        onChange(value.replaceAll(/[+|\-| ]/gm, ""));
                    }}
                    {...field}
                    error={!!error}
                    required
                    helperText={error?.message || " "}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end" disablePointerEvents>
                          ????
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="sex"
                control={control}
                rules={{
                  required: "???????? ???? ??????????????????!",
                }}
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    select
                    label="??????????"
                    variant="standard"
                    fullWidth
                    SelectProps={{
                      onClose: onSelectClose,
                    }}
                    {...field}
                    error={!!error}
                    helperText={error?.message || " "}
                  >
                    {sex.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="eyeColor"
                control={control}
                rules={{
                  required: "???????? ???? ??????????????????!",
                }}
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    select
                    label="?????????? ????????"
                    variant="standard"
                    fullWidth
                    SelectProps={{
                      onClose: onSelectClose,
                    }}
                    {...field}
                    error={!!error}
                    helperText={error?.message || " "}
                  >
                    {eyeColor.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>??????????????</Button>
        <Button
          onClick={() => submitFormRef.current?.click()}
          disabled={!isValid}
        >
          ??????????????????????
        </Button>
        <input type="submit" form="myform" hidden ref={submitFormRef} />
      </DialogActions>
    </Dialog>
  );
}

export default memo(AddRecordDialog);
