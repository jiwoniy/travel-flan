import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import AlbumsHeader from './AlbumsHeader';
import AlbumsItems from './AlbumsItems';
import { AuthSelectors } from '../../redux/reducers';
import { AlbumsActions } from '../../redux/actions';
import { albums as albumsShape } from '../../helpers/shape';
import hasEmpty from '../../helpers/hasEmpty';
import './Albums.css';

const defaultItem = {
  title: '',
  userId: 1, // TODO: temp setting
};

class Albums extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      albumItem: {},
      tempAlbumItem: defaultItem,
    };

    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.albumsItemsClick = this.albumsItemsClick.bind(this);
    this.requestCloseModal = this.requestCloseModal.bind(this);
    this.requestOpenModal = this.requestOpenModal.bind(this);
  }

  albumsItemsClick(album) {
    this.setState({
      isModalOpen: true,
      albumItem: album,
      tempAlbumItem: album,
    });
  }

  save() {
    const { createAlbum, updateAlbum, userId } = this.props;
    const { albumItem, tempAlbumItem } = this.state;
    if (hasEmpty(albumItem)) {
      createAlbum({
        ...tempAlbumItem,
        userId,
      });
    } else if (tempAlbumItem.id && albumItem.title !== tempAlbumItem.title) {
      updateAlbum(tempAlbumItem);
    }

    this.requestCloseModal();
  }

  delete() {
    const { deleteAlbum } = this.props;
    const { albumItem } = this.state;
    if (albumItem.id) {
      deleteAlbum(albumItem);
    }
    this.requestCloseModal();
  }

  requestCloseModal() {
    this.setState({
      isModalOpen: false,
      albumItem: {},
      tempAlbumItem: defaultItem,
    });
  }

  requestOpenModal() {
    this.setState({
      isModalOpen: true,
    });
  }

  renderModal() {
    const { isModalOpen, tempAlbumItem } = this.state;
    return (
      <Modal
        isOpen={isModalOpen}
        onAfterOpen={this.requestOpenModal}
        onRequestClose={this.requestCloseModal}
        contentLabel="Modal"
        ariaHideApp={false}
      >
        <div className="AlbumModal">
          <h1>Modal Content</h1>
          <div className="body" >
            <input
              type="text"
              value={tempAlbumItem.title}
              onChange={e => this.setState({
                tempAlbumItem: {
                  ...tempAlbumItem,
                  title: e.target.value,
                },
              })}
            />
          </div>
          <div className="bottom" >
            <button onClick={this.save}> save </button>
            <button onClick={this.delete}> delete </button>
            <button onClick={this.requestCloseModal}> close </button>
          </div>
        </div>
      </Modal>
    );
  }

  render() {
    const { albums } = this.props;
    // TODO: Improve performance(do not use inline fucntion)
    const listItems = albums.map(album => (
      <AlbumsItems
        key={album.id}
        albumItem={album}
        onAlbumsItemsClick={() => this.albumsItemsClick(album)}
      />
    ));

    return (
      <div className="Albums">
        <AlbumsHeader />
        <button
          onClick={this.requestOpenModal}
        >
          create
        </button>
        {listItems}
        {this.renderModal()}
      </div>
    );
  }
}

Albums.propTypes = {
  albums: albumsShape,
  userId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  updateAlbum: PropTypes.func.isRequired,
  deleteAlbum: PropTypes.func.isRequired,
  createAlbum: PropTypes.func.isRequired,
};

Albums.defaultProps = {
  albums: [],
  userId: 0,
};

const mapStateToProps = state => ({
  userId: AuthSelectors.getUserId(state),
});

const mapDispatchToProps = dispatch => ({
  updateAlbum: payload => dispatch(AlbumsActions.updateAlbum(payload)),
  deleteAlbum: payload => dispatch(AlbumsActions.deleteAlbum(payload)),
  createAlbum: payload => dispatch(AlbumsActions.createAlbum(payload)),
});

const connectAlbum = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Albums);

export default connectAlbum;
