import { Card, Typography } from "@mui/material";
import { FlexRowCenter } from "components/flex-box";
import LazyImage from "components/LazyImage";
import Avatar from '@mui/material/Avatar';
const MobileBrandsImage = ({ name, logo_photo, Icon }) => {
  return (
    <FlexRowCenter flexDirection="column">
      {logo_photo ? (
        <Avatar
          src={logo_photo}
          alt={name}
          sx={{ width:90, height:90}}
        />
      ) : (
        Icon && <Icon size="48px">{name.charAt(0)}</Icon>
      )}
      <Typography
        className="ellipsis"
        textAlign="center"
        fontSize="11px"
        lineHeight="1"
        mt={1}
      >
        {name}
      </Typography>
    </FlexRowCenter>
  );
};

export default MobileBrandsImage;