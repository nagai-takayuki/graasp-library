export default (req, res) => {
  res.status(200).json({
    // eslint-disable-next-line no-underscore-dangle
    coverage: global.__coverage__ || null,
  });
};
