const Listing = require("../models/listing");
const opencage = require("opencage-api-client");
const opencageToken = process.env.OPENCAGE_API_KEY;

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Invalid Listing Requested!");
    return res.redirect("/listings");
  }
  // console.log(listing);
  res.render("listings/show", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let geocodeResponse = await opencage.geocode({
    q: req.body.listing.location,
    key: opencageToken,
    limit: 1,
  });

  let geoJSON;

  if (
    geocodeResponse.status.code === 200 &&
    geocodeResponse.results.length > 0
  ) {
    const place = geocodeResponse.results[0];
    const { lat, lng } = place.geometry;

    geoJSON = {
      type: "Point",
      coordinates: [lng, lat],
    };
  } else {
    req.flash("error", "Location not found!");
    return res.redirect("/listings/new");
  }

  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  newListing.geometry = geoJSON;

  let savedListing = await newListing.save();

  console.log(savedListing);

  req.flash("success", "New Listing is Created Successfully");
  res.redirect("/listings");

};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Invalid Listing Requested!");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  // console.log(originalImageUrl);
  originalImageUrl = originalImageUrl.replace(
    "/upload",
    "/upload/w_250"
  );
  res.render("listings/edit", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated Successfully");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted Successfully");
  res.redirect("/listings");
};
