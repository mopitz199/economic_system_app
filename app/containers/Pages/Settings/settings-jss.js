const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  title: {
    display: 'block',
    margin: `${theme.spacing(3)}px 0`,
    color: theme.palette.common.white,
  },
  searchSettings: {
    marginBottom: theme.spacing(4),
  },
  wrapper: {
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(1),
    borderRadius: 2,
    display: 'block',
  },
  search: {
    width: 'auto',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    font: 'inherit',
    padding: `${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(4)}px`,
    border: 0,
    display: 'block',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
    background: 'none',
    margin: 0, // Reset for Safari
    color: 'inherit',
    width: '100%',
    '&:focus': {
      outline: 0,
    },
  },
  iconTitle: {
    position: 'relative',
    marginRight: theme.spacing(0.5),
  },
  button: {
    display: 'block',
    width: '100%',
    background: theme.palette.grey[50],
    '&:hover': {
      background: theme.palette.secondary.light
    },
    '& $icon': {
      margin: '0 auto',
      display: 'block',
      fontSize: 64
    },
    '& $info': {
      display: 'block',
      textTransform: 'none',
      color: theme.palette.grey[500]
    }
  },
  info: {},
  icon: {},
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  iconSmall: {
    fontSize: 20,
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
});

export default styles;
