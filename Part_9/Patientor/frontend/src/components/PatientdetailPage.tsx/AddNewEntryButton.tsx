import { Button } from "@mui/material";

const AddNewEntryButton = ({onClick} : {onClick: () => void}) => {
  return (
    <Button variant="contained" color="primary" sx={{ marginBottom: 2 }} onClick={onClick}>
      ADD NEW ENTRY
    </Button>
  );
};

export default AddNewEntryButton;