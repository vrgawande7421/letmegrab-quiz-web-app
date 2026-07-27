import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { getAllQuiz } from "../../api/services/admin/AdminService";

const QuizList = () => {

  const [quizList, setQuizList] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const fetchQuizList = async () => {

    try {

      setLoading(true);

      const response = await getAllQuiz();

      if (response.data.success) {

        setQuizList(response.data.data);

      }


    } catch (error) {

      console.log("Quiz Fetch Error", error);

    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {
    fetchQuizList();
  }, []);




  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh] gap-3">
        <FaSpinner className="animate-spin text-blue-600 text-4xl" />
        <h2 className="text-xl font-semibold text-gray-700">Loading Quizzes...</h2>
      </div>
    );
  }




  return (

    <div className="max-w-6xl mx-auto mt-10 px-5">


      <h1 className="text-3xl font-bold mb-8">
        Available Quiz
      </h1>



      {
        quizList.length === 0 ? (

          <div className="text-center">

            <h2 className="text-xl font-semibold">
              No Quiz Available
            </h2>

          </div>


        ) : (


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


            {
              quizList.map((quiz) => (


                <div

                  key={quiz._id}

                  className="
                border 
                rounded-xl
                shadow-md
                p-6
                hover:shadow-lg
                transition
                "
                >



                  <h2 className="text-xl font-bold">

                    {quiz.title}

                  </h2>




                  <div className="mt-4 text-gray-600">


                    <p>
                      Total Questions : {quiz.questions.length}
                    </p>


                    <p>
                      Created Date : {
                        new Date(
                          quiz.createdAt
                        ).toLocaleDateString()
                      }
                    </p>


                  </div>




                  <button

                    disabled={
                      quiz.questions.length === 0
                    }


                    onClick={() => {

                      navigate(`/quiz/${quiz._id}`);

                    }}



                    className={`
                  mt-5
                  w-full
                  py-2
                  rounded-lg
                  text-white
                  font-semibold

                  ${quiz.questions.length === 0

                        ?
                        "bg-gray-400 cursor-not-allowed"

                        :

                        "bg-blue-600 hover:bg-blue-700 cursor-pointer"

                      }

                  `}

                  >


                    {
                      quiz.questions.length === 0

                        ?

                        "Not Available"

                        :

                        "Start Quiz"

                    }


                  </button>



                </div>


              ))
            }


          </div>


        )
      }



    </div>


  );

};


export default QuizList;