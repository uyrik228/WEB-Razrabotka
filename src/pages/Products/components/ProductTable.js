import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct, updateProduct } from '../../../redux/actions/productsActions';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ProductTable = ({ isAdmin }) => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [editProduct, setEditProduct] = React.useState(null);
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleEdit = (product) => {
    setEditProduct(product);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = () => {
    dispatch(updateProduct(editProduct));
    setEditProduct(null);
  };

  return (
    <TableContainer component={Paper} style={{ backgroundColor: theme.palette.background.paper }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Описание</TableCell>
            <TableCell>Товар</TableCell>
            <TableCell>Цена</TableCell>
            <TableCell>Количество</TableCell>
            {isAdmin && (
              <>
                <TableCell>Редактировать</TableCell>
                <TableCell>Удалить</TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              {isAdmin && (
                <>
                  <TableCell>
                    <Button variant="contained" color="secondary" onClick={() => handleEdit(product)}>
                      Редактировать
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleDelete(product.id)}>
                      Удалить
                    </Button>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editProduct && (
        <Dialog open={Boolean(editProduct)} onClose={() => setEditProduct(null)}>
          <DialogTitle>Редактировать продукт</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Описание"
              type="text"
              fullWidth
              name="description"
              value={editProduct .description}
              onChange={handleEditChange}
            />
            <TextField
              margin="dense"
              label="Товар"
              type="text"
              fullWidth
              name="name"
              value={editProduct.name}
              onChange={handleEditChange}
            />
            <TextField
              margin="dense"
              label="Цена"
              type="number"
              fullWidth
              name="price"
              value={editProduct.price}
              onChange={handleEditChange}
            />
            <TextField
              margin="dense"
              label="Количество"
              type="number"
              fullWidth
              name="quantity"
              value={editProduct.quantity}
              onChange={handleEditChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditProduct(null)} color="primary">
              Отмена
            </Button>
            <Button onClick={handleEditSave} color="primary">
              Сохранить
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </TableContainer>
  );
};

export default ProductTable;