const Discount = require("../models/discount");

const postDiscount = async (req, res) => {
  const { product_id, discount_percentage, start_date, end_date, description } =
    req.body;
  const discountModel = new Discount(
    product_id,
    discount_percentage,
    start_date,
    end_date,
    description
  );

  try {
    const createRecord = await discountModel.create();
    return res.status(201).json({
      createRecord,
      msg: "Discount added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

const getAllDiscounts = async (req, res) => {
  try {
    const [discounts] = await Discount.getAll();
    return res.status(200).json(discounts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

const getDiscountsByProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const [discounts] = await Discount.getByProductId(productId);
    return res.status(200).json(discounts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

const deleteDiscount = async (req, res) => {
  const { discountId } = req.params;
  try {
    await Discount.deleteById(discountId);
    return res.status(200).json({ msg: "Discount deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

module.exports = {
  postDiscount,
  getAllDiscounts,
  getDiscountsByProduct,
  deleteDiscount,
};
