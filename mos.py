import sys
from opencog.pymoses import moses
moses=moses()
def run():
	args='-i ./uploads/datasets/3b299a1028e563dc9543baaad4c9ba69.csv -u C --log-file ./server/py-app/results/1.log -w1'
	output = moses.run(args=args, scheme=True)
	result = moses.scheme_result(output)
	return result

def result(argv , content ):
	output='./server/py-app/results/1.scm'
	of=open(output, "w")
	of.write(content)

if __name__ == '__main__':
	print sys.argv
	output=run()
	# print output
	result(sys.argv,output)
