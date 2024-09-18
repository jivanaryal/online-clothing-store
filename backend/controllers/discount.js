const Discount = require("../models/discount");

const postDiscount = async (req, res) => {
  const { product_id, discount_percentage, start_date, end_date, description } =
    req.body;

    const date = new Date(start_date);
    const date1 = new Date(end_date);

   const new_start_date = start_date.slice(0,10);
   const new_end_date = end_date.slice(0,10);

    // console.log(product_id,discount_percentage,start_date,end_date)
  const discountModel = new Discount(
    product_id,
    discount_percentage,
    new_start_date,
    new_end_date,
    description
  );

  try {
    const createRecord = await discountModel.create();
    return res.status(200).json({
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

const updateDiscount = async (req,res)=>{
  
    const {discountId} = req.params;
    const {product_id,discount_percentage,start_date,end_date,description} = req.body;
    // console.log(req.body,discountId)

    const date = new Date(start_date);
    const date1 = new Date(end_date);

   const new_start_date = start_date.slice(0,10);
   const new_end_date = end_date.slice(0,10);

    try{
       
       const model = new Discount(product_id,discount_percentage,new_start_date,new_end_date,description);


       const update = model.updateDis(discountId);
       return res.status(200).json({
        update,
        msg: "Discount added successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Internal Server Error",
        msg: error.message,
      });
    }

}

module.exports = {
  postDiscount,
  getAllDiscounts,
  getDiscountsByProduct,
  deleteDiscount,
  updateDiscount
};
