import React, { useState } from "react";
import { Table, ConfigProvider, Input, Button, Tooltip } from "antd";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import GetPageName from "../../../components/common/GetPageName";
import { LuX, LuCheck } from "react-icons/lu";
import shoe from "../../../assets/shoe.png";

import { FaRegEye } from "react-icons/fa";
import ProductsDetailsModal from "./ProductsDetailsModal";
import { RiDeleteBin6Line } from "react-icons/ri";

function ProductList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [userData, setUserData] = useState(data);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [selectedProvider, setSelectedProvider] = useState(null); // Selected product data

  // Open the modal and set the selected product data
  const handleModalOpen = (record) => {
    setSelectedProvider(record); // Set the selected product data
    setIsModalOpen(true); // Open the modal
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const filteredData = userData.filter(
    (user) =>
      user.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phoneNumber.includes(searchQuery) ||
      user.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.spent.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  const handleSave = (updatedProvider) => {
    setUserData((prevData) =>
      prevData.map((user) =>
        user.key === updatedProvider.key ? updatedProvider : user
      )
    );
    setIsModalOpen(false);
  };

  const handleDeleteSelected = () => {
    setUserData(userData.filter((user) => !selectedRowKeys.includes(user.key)));
    setSelectedRowKeys([]);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            rowSelectedBg: "#f6f6f6",
            headerBg: "#f6f6f6",
            headerSplitColor: "none",
            headerBorderRadius: "none",
            cellFontSize: "16px",
          },
          Pagination: {
            borderRadius: "3px",
            itemActiveBg: "#18a0fb",
          },
          Button: {
            defaultHoverBg: "#fd7d00 ",
            defaultHoverColor: "white",
            defaultHoverBorderColor: "#fd7d00 ",
          },
          Input: {
            hoverBorderColor: "#fd7d00",
            activeBorderColor: "#fd7d00",
          },
        },
      }}
    >
      <div className="flex justify-between items-center py-5">
        <h1 className="text-[20px] font-medium">{GetPageName()}</h1>
        <div className="flex gap-3">
          <Input
            placeholder="Search ..."
            onChange={(e) => handleSearch(e.target.value)}
            prefix={<SearchOutlined />}
            className="h-9 gap-2"
            allowClear
          />
          {selectedRowKeys.length > 0 && (
            <Button
              icon={<DeleteOutlined />}
              onClick={handleDeleteSelected}
              className="bg-abbes/90 hover:bg-abbes text-white border-none h-9"
            >
              Delete Selected
            </Button>
          )}
        </div>
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns(handleModalOpen)}
        dataSource={filteredData}
        pagination={{
          defaultPageSize: 5,
          position: ["bottomRight"],
          size: "default",
          total: 50,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />

      {/* Modal */}
      <ProductsDetailsModal
        isModalOpen={isModalOpen}
        handleCancel={() => setIsModalOpen(false)}
        providerData={selectedProvider}
      />
    </ConfigProvider>
  );
}

export default ProductList;

const columns = (handleModalOpen) => [
  {
    title: "Product Name",
    dataIndex: "productName",
    key: "productName",
    width: "12%",
  },
  {
    title: "Image",
    dataIndex: "productImage",
    key: "productImage",
    width: "20%",
    render: (_, record) => (
      <img src={record.productImage} width={100} alt="Product" />
    ),
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Submitted By",
    dataIndex: "submittedBy",
    key: "submittedBy",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: "15%",
    render: (_, record) => (
      <span
        className={`text-${
          record.status === "Available" ? "green-500" : "red-500"
        }`}
      >
        {record.status}
      </span>
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (_, record) => (
      <div className="flex items-center gap-3">
        <Tooltip title="View">
          <FaRegEye
            size={25}
            className="hover:text-abbes cursor-pointer"
            onClick={() => handleModalOpen(record)} // Open modal on click
          />
        </Tooltip>
        <Tooltip title="Delete">
          <RiDeleteBin6Line
            size={25}
            className="hover:text-red-500 cursor-pointer"
          />
        </Tooltip>
      </div>
    ),
  },
];

const data = [
  {
    key: 1,
    productName: "Men's Nike Air Zoom Pegasus 38",
    category: "shoe",
    submittedBy: "Ahmed Khalil",
    price: `Qar${500}`,
    status: "Available",
    productImage: shoe, // Dynamic image URL
  },
  {
    key: 2,
    productName: "Men's Nike Air Zoom Pegasus 38",
    category: "shoe",
    submittedBy: "Ahmed Khalil",
    price: `Qar${500}`,
    status: "Sold",
    productImage: shoe, // Dynamic image URL
  },
  {
    key: 3,
    productName: "Men's Nike Air Zoom Pegasus 38",
    category: "shoe",
    submittedBy: "Ahmed Khalil",
    price: `Qar${500}`,
    status: "Available",
    productImage: shoe,
  },
  {
    key: 4,
    productName: "Men's Nike Air Zoom Pegasus 38",
    category: "shoe",
    submittedBy: "Ahmed Khalil",
    price: `Qar${500}`,
    status: "Sold",
    productImage: shoe,
  },
  {
    key: 5,
    productName: "Men's Nike Air Zoom Pegasus 38",
    category: "shoe",
    submittedBy: "Ahmed Khalil",
    price: `Qar${500}`,
    status: "Available",
    productImage: shoe,
  },
  {
    key: 6,
    productName: "Men's Nike Air Zoom Pegasus 38",
    category: "shoe",
    submittedBy: "Ahmed Khalil",
    price: `Qar${500}`,
    status: "Sold",
    productImage: shoe,
  },
];
