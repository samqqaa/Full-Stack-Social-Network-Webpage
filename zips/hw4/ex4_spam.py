from sklearn import preprocessing, metrics
import utils
import scipy.io
import numpy as np
from linear_classifier import LinearSVM_twoclass


#############################################################################
# load the SPAM email training and test dataset                             #
#############################################################################

X,y = utils.load_mat('data/spamTrain.mat')
yy = np.ones(y.shape)
yy[y==0] = -1

# XX = X
XX = np.vstack([np.ones((X.shape[0],)),X.T]).T  # 4000 * (1899 + 1) intercept?

test_data = scipy.io.loadmat('data/spamTest.mat')
X_test = test_data['Xtest']
y_test = test_data['ytest'].flatten()
XX_test = np.vstack([np.ones((X_test.shape[0],)),X_test.T]).T  # (1899 + 1) intercept?


#############################################################################
# your code for setting up the best SVM classifier for this dataset         #
# Design the training parameters for the SVM.                               #
# What should the learning_rate be? What should C be?                       #
# What should num_iters be? Should X be scaled? Should X be kernelized?     #
#############################################################################
# your experiments below

svm = LinearSVM_twoclass()
svm.theta = np.zeros((XX.shape[1],))


# First going no-kernels. Split XX, yy in to training set and validation set
# print "First going non kernelized way"
print "Now with kernelized way... this will be long!"

all_ind = np.arange(0,4000)
val_ind = np.random.choice(all_ind,100)
tra_ind = np.delete(all_ind, val_ind)
print all_ind.shape, tra_ind.shape, val_ind.shape

XXtrain, ytrain, XXval, yval = XX[tra_ind], yy[tra_ind], XX[val_ind], yy[val_ind]
'''
indices = np.random.permutation(XX.shape[0])
training_idx, val_idx = indices[:3900], indices[3900:]
XXtrain, XXval, ytrain, yval = XX[training_idx,:], XX[val_idx,:], y[training_idx], y[val_idx]
'''
print "Shapes:\nXXtrain={}  ytrain={}   XXval={}    yval={}".format(XXtrain.shape, ytrain.shape, XXval.shape, yval.shape)

# value range of tuning parameters

sigma_vals = [0.01,0.03,0.1,0.3,1,3,10,30]
Cvals = [0.01, 0.1, 0.5, 1, 10, 50]
lr_vals = [1e-3, 1e-1]
num_iters_val = [1000, 500]

best_acc = 0.0
best_sigma = 0.01
best_C = 0.01
best_lr = 1e-3
best_num_iter = 1000

# apply svm train with training set: XXtrain, ytrain
for sigma in sigma_vals:
    print "kernelizing"
    K = np.array([utils.gaussian_kernel(x1,x2,sigma) for x1 in XXtrain for x2 in XXtrain]).reshape(XXtrain.shape[0],XXtrain.shape[0])
    print "done"
    scaler = preprocessing.StandardScaler().fit(K)
    scaleK = scaler.transform(K)
    KK = np.vstack([np.ones((scaleK.shape[0],)),scaleK]).T
    print "kernelized training data"
    K_val = np.array([utils.gaussian_kernel(x1,x2,sigma) for x1 in XXval for x2 in XXtrain]).reshape(XXval.shape[0],XXtrain.shape[0])
    scaler_val = preprocessing.StandardScaler().fit(K_val)
    scaleK_val = scaler_val.transform(K_val)
    KK_val = np.vstack([np.ones((scaleK_val.shape[0],)),scaleK_val.T]).T
    print "kernelized validation"

    for C in Cvals:
        for lr in lr_vals:
            for num_iters in num_iters_val:
                svm = LinearSVM_twoclass()
                svm.theta = np.zeros((KK.shape[1],))
                svm.train(KK,ytrain,learning_rate=lr,C=C,num_iters=num_iters,verbose=False)

                #svm.train(XXtrain,ytrain,learning_rate=lr,C=C,num_iters=num_iters,verbose=False)
                #yval_pred = svm.predict(XXval)

                #acc_history.append(metrics.accuracy_score(yval,yval_pred))
                ac = metrics.accuracy_score(yval,svm.predict(KK_val))
                if ac > best_acc:
                    best_acc = ac
                    best_C = C
                    best_sigma = sigma
                    best_lr = lr
                    best_num_iter = num_iters

                print "C = ",C,\
                    ", learning rate = ", lr, \
                    ", num_iters = ", num_iters, \
                    ", kernel width = ", sigma, \
                    ", accurancy = ",ac

print "Best Hyperparameters:\n sigma = {}   C = {}   num_iters = {}  leraning_rate = {}".format(best_sigma, best_C, best_num_iter, best_lr)

#############################################################################
#  end of your code                                                         #
#############################################################################

#############################################################################
# what is the accuracy of the best model on the training data itself?       #
#############################################################################
# 2 lines of code expected

#extra code for kernelizing
K = np.array([utils.gaussian_kernel(x1,x2,best_sigma) for x1 in XX for x2 in XX]).reshape(XX.shape[0],XX.shape[0])
scaler = preprocessing.StandardScaler().fit(K)
scaleK = scaler.transform(K)
KK = np.vstack([np.ones((scaleK.shape[0],)),scaleK]).T
svm.train(KK,yy,learning_rate=best_lr,C=best_C,num_iters=best_num_iter,verbose=False)

y_pred = svm.predict(KK)
print "Accuracy of model on training data is: ", metrics.accuracy_score(yy,y_pred)


#############################################################################
# what is the accuracy of the best model on the test data?                  #
#############################################################################
# 2 lines of code expected

#extra code for kernelizing
K_test = np.array([utils.gaussian_kernel(x1,x2,best_sigma) for x1 in XX_test for x2 in XX]).reshape(XX_test.shape[0],XX.shape[0])
scaler_test = preprocessing.StandardScaler().fit(K_test)
scaleK_test = scaler_test.transform(K_test)
KK_test = np.vstack([np.ones((scaleK_test.shape[0],)),scaleK_test.T]).T

yy_test = np.ones(y_test.shape)
yy_test[y_test==0] = -1
test_pred = svm.predict(KK_test)
print "Accuracy of model on test data is: ", metrics.accuracy_score(yy_test,test_pred)


#############################################################################
# Interpreting the coefficients of an SVM                                   #
# which words are the top predictors of spam?                               #
#############################################################################
# 4 lines of code expected

words, inv_words = utils.get_vocab_dict()

index = np.argsort(svm.theta)[-15:]
print "Top 15 predictors of spam are: "
for i in range(-1,-16,-1):
    print words[index[i]+1]


