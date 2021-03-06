import React from 'react';
import uuid from 'uuid/v1';
import PropTypes from 'prop-types';
import './CommentSection.css';

class CommentSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      liked: false,
    };
  }

  onCommentChange = event => {
    this.setState({
      comment: event.target.value,
    });
  };

  onCommentSubmit = event => {
    event.preventDefault();
    this.props.addComment(this.props.postId, this.state.comment);
    this.setState({ comment: '' });
  };

  onLikeClick = () => {
    if (!this.state.liked) {
      this.props.toggleLike(this.props.postId, 1);
    } else {
      this.props.toggleLike(this.props.postId, -1);
    }
    this.setState({ liked: !this.state.liked });
  };

  render() {
    return (
      <div>
        <div className="row icons">
          <div onClick={this.onLikeClick}>
            <i className="col-sm-1 far fa-heart" />
            {/* fas and far are different sizes?!? */}
            {/* <i className={'col-sm-1 fa-heart ' + (this.state.liked ? 'fas' : 'far')} /> */}
          </div>
          <div>
            <i className="col-sm-1 far fa-comment fa-flip-horizontal" />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">{this.props.post.likes} likes</div>
        </div>
        <div>
          {this.props.post.comments.map(c => (
            <div key={uuid()} className="row">
              <p className="comment username">{c.username}</p> &nbsp;
              <p className="comment text">{c.text}</p>
            </div>
          ))}
        </div>
        <div className="newComment">
          <form onSubmit={this.onCommentSubmit}>
            <input
              className="commentBox"
              type="text"
              name="comment"
              placeholder="Add a comment..."
              onChange={this.onCommentChange}
              value={this.state.comment}
            />
          </form>
        </div>
      </div>
    );
  }
}

CommentSection.propTypes = {
  commnet: PropTypes.shape({
    username: PropTypes.string.isRequired,
    comment: PropTypes.string,
  }),
};

export default CommentSection;
