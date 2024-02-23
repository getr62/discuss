const paths = {
  home() {
    return '/';
  },
  signin() {
    return '/sign-in';
  },
  topicShow(topicSlug: string) {
    return `/topics/${topicSlug}`;
  },
  postCreate(topicSlug: string) {
    return `/topics/${topicSlug}/posts/new`;
  },
  postShow(topicSlug: string, postId: string) {
    return `/topics/${topicSlug}/posts/${postId}`;
  },
  postEdit(topicSlug: string, postId: string) {
    return `/topics/${topicSlug}/posts/${postId}/edit`;
  },
};

export default paths;
