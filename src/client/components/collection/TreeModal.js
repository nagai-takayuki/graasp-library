import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { DEFAULT_GET } from '../../../api/common';
import { GET_NAV_TREE_ROUTE } from '../../config/routes';
import {
  ROOT_ID,
  TREE_VIEW_HEIGHT,
  TREE_VIEW_MIN_WIDTH,
} from '../../config/constants';

const styles = () => ({
  root: {
    height: TREE_VIEW_HEIGHT,
    flexGrow: 1,
    minWidth: TREE_VIEW_MIN_WIDTH,
  },
  cancelButton: {
    color: '#f44336',
  },
});

class TreeModal extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    classes: PropTypes.shape({
      cancelButton: PropTypes.string.isRequired,
      root: PropTypes.string.isRequired,
    }).isRequired,
    onConfirm: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    t: PropTypes.func.isRequired,
    description: PropTypes.string,
  };

  static defaultProps = {
    description: '',
    title: 'Tree Modal',
  };

  state = { spaces: [], selectedId: null };

  async componentDidUpdate({ open: prevOpen }) {
    const { open } = this.props;
    if (!prevOpen && open) {
      // fetch root spaces
      const newSpaces = await (
        await fetch(GET_NAV_TREE_ROUTE, DEFAULT_GET)
      ).json();
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ spaces: newSpaces?.[0]?.children });
    }
  }

  handleClose = () => {
    const { onClose } = this.props;
    onClose();
  };

  submit = () => {
    const { onConfirm } = this.props;
    const { selectedId } = this.state;
    onConfirm({ id: selectedId });
    this.handleClose();
  };

  onSelect = (e, value) => {
    this.setState({ selectedId: value });
  };

  renderSpaces = () => {
    const { spaces } = this.state;

    if (!spaces || !spaces.length) {
      return null;
    }

    return spaces.map(({ name, _id: id }) => (
      <TreeItem key={id} nodeId={id} label={name} />
    ));
  };

  renderDescription = () => {
    const { description } = this.props;
    if (!description) {
      return null;
    }

    return <Typography variant="subtitle2">{description}</Typography>;
  };

  render() {
    const { selectedId } = this.state;
    const { title, classes, open, t } = this.props;

    // compute tree only when the modal is open
    const tree = !open ? null : (
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        onNodeSelect={this.onSelect}
      >
        <TreeItem nodeId={ROOT_ID} label={t('My Spaces')}>
          {this.renderSpaces()}
        </TreeItem>
      </TreeView>
    );

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">
          {title}
          {this.renderDescription()}
        </DialogTitle>
        <DialogContent>{tree}</DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} className={classes.cancelButton}>
            {t('Cancel')}
          </Button>
          <Button onClick={this.submit} color="primary" disabled={!selectedId}>
            {t('Confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const TranslatedComponent = withTranslation()(TreeModal);
export default withStyles(styles, { withTheme: true })(TranslatedComponent);
