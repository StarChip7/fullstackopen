import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Pressable, TextInput, View } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useNavigate } from "react-router-native";

const styles = {
  container: {
    margin: 2,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },
};

const validationSchema = Yup.object().shape({
  repositoryName: Yup.string().required('Repository name is required'),
  ownerName: Yup.string().required('Owner name is required'),
  rating: Yup.number().required('Rating is required').min(0).max(100),
  review: Yup.string(),
});

const CreateReview = () => {
  const navigate = useNavigate();
  const [createReview] = useMutation(CREATE_REVIEW);
  
  const formik = useFormik({
    initialValues: {
      repositoryName: '',
      ownerName: '',
      rating: '',
      review: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const variables = {
          repositoryName: values.repositoryName,
          ownerName: values.ownerName,
          rating: Number(values.rating),
          text: values.review,
        };
        const { data } = await createReview({ variables });
        console.log(data.createReview.repositoryId);
        navigate(`/repositories/${data.createReview.repositoryId}`);
      } catch (e) {
        console.error(e);
      }
    },
  });
  return (
    <View style={styles.container}>
        <TextInput
          placeholder='Repository Name'
          value={formik.values.repositoryName}
          onChangeText={formik.handleChange('repositoryName')}
          style={[styles.input, { borderColor: formik.touched.repositoryName && formik.errors.repositoryName ? theme.colors.error : 'gray'  }]}
        />
        {formik.touched.repositoryName && formik.errors.repositoryName && (
          <Text color='error'>{formik.errors.repositoryName}</Text>
        )}
        <TextInput
          placeholder='Owner Name'
          value={formik.values.ownerName}
          onChangeText={formik.handleChange('ownerName')}
          style={[styles.input, { borderColor: formik.touched.ownerName && formik.errors.ownerName ? theme.colors.error : 'gray'  }]}
        />
        {formik.touched.ownerName && formik.errors.ownerName && (
          <Text color='error'>{formik.errors.ownerName}</Text>
        )}
        <TextInput
          placeholder='Rating'
          value={formik.values.rating}
          onChangeText={formik.handleChange('rating')}
          style={[styles.input, { borderColor: formik.touched.rating && formik.errors.rating ? theme.colors.error : 'gray'  }]}
        />
        {formik.touched.rating && formik.errors.rating && (
          <Text color='error'>{formik.errors.rating}</Text>
        )}
        <TextInput
          placeholder='Review'
          value={formik.values.review}
          onChangeText={formik.handleChange('review')}
          style={[styles.input, { borderColor: formik.touched.review && formik.errors.review ? theme.colors.error : 'gray'  }]}
          multiline
        />
        <Pressable onPress={formik.handleSubmit} style={{ backgroundColor: '#0366d6', padding: 10, borderRadius: 5, marginTop: 10, textAlign: 'center' }}>
          <Text>Create Review</Text>
        </Pressable>

    </View>
  );
};

export default CreateReview;